import React from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { reveal, viewport } from "../animation";

function PipelineArtifact({ flow }) {
  return (
    <div className="artifact-body pipeline-artifact">
      {flow.map((step, index) => (
        <div className="artifact-node" key={step}>
          <small>{String(index + 1).padStart(2, "0")}</small>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}

function RetrievalArtifact({ flow }) {
  return (
    <div className="artifact-body retrieval-artifact">
      <div className="retrieval-node query"><small>01 / Query</small><strong>{flow[0]}</strong></div>
      <div className="retrieval-branches">
        <div className="retrieval-node"><small>Sparse</small><strong>BM25</strong></div>
        <div className="retrieval-node"><small>Dense</small><strong>FAISS</strong></div>
      </div>
      <div className="retrieval-node context"><small>03 / Context</small><strong>{flow[2]}</strong></div>
      <div className="retrieval-node answer"><small>04 / Output</small><strong>{flow[3]}</strong></div>
    </div>
  );
}

function SentimentArtifact({ visual }) {
  return (
    <div className="artifact-body sentiment-artifact">
      <div className="sentiment-input"><small>Vietnamese review / input</small><strong>Text → features → aspect model</strong></div>
      <div className="aspect-list">
        {visual.aspects.map((aspect, index) => (
          <div key={aspect}><small>{String(index + 1).padStart(2, "0")}</small><strong>{aspect}</strong><span>aspect / sentiment</span></div>
        ))}
      </div>
      <div className="sentiment-output"><small>Output layer</small><strong>{visual.flow[3]}</strong></div>
    </div>
  );
}

function VisionArtifact({ flow }) {
  return (
    <div className="artifact-body vision-artifact">
      <div className="vision-frame">
        <span className="scan-line" />
        <div className="vision-shape"><span /><span /><span /></div>
        <small>Image input / scan</small>
      </div>
      <div className="vision-flow">
        {flow.slice(1).map((step, index) => (
          <div key={step}><small>{String(index + 2).padStart(2, "0")}</small><strong>{step}</strong></div>
        ))}
      </div>
    </div>
  );
}

function ProjectArtifact({ project }) {
  const { visual } = project;
  return (
    <div className={`project-artifact artifact-${visual.kind}`}>
      <div className="artifact-head">
        <span>{visual.label} / online</span>
        <span>{project.code}</span>
      </div>
      {visual.kind === "pipeline" && <PipelineArtifact flow={visual.flow} />}
      {visual.kind === "retrieval" && <RetrievalArtifact flow={visual.flow} />}
      {visual.kind === "sentiment" && <SentimentArtifact visual={visual} />}
      {visual.kind === "vision" && <VisionArtifact flow={visual.flow} />}
      <div className="artifact-foot">
        <div><small>Domain</small><strong>{project.category}</strong></div>
        <div><small>Mode</small><strong>{visual.mode}</strong></div>
        <div><small>Outcome</small><strong>{project.outcome}</strong></div>
      </div>
    </div>
  );
}

function ProjectChapter({ project, index }) {
  return (
    <motion.article
      id={project.id}
      className={`project-chapter ${index % 2 ? "is-reversed" : ""}`}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={reveal}
    >
      <div className="project-copy">
        <p className="project-kicker">Deployment {project.index} / {project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <dl className="project-facts">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Stack</dt><dd>{project.stack.join(" / ")}</dd></div>
        </dl>
        <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
          View repository <span aria-hidden="true">↗</span>
        </a>
      </div>
      <ProjectArtifact project={project} />
    </motion.article>
  );
}

export function Work() {
  return (
    <section id="work" className="section-shell work-section">
      <div className="section-heading">
        <p>01 / Selected work</p>
        <h2>Systems built for real questions.</h2>
        <span>Four projects across educational retrieval, Vietnamese language understanding, and computer vision.</span>
      </div>
      <div className="project-list">
        {profile.projects.map((project, index) => <ProjectChapter project={project} index={index} key={project.id} />)}
      </div>
    </section>
  );
}
